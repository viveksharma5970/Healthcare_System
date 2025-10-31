import { useEffect, useState } from 'react';
import { useMappingStore } from '../../stores/mappingStore';
import { useDoctorStore } from '../../stores/doctorStore';
import { usePatientStore } from '../../stores/patientStore';
import { Plus, X } from 'lucide-react';

export default function Mappings() {
  const { mappings, isLoading, fetchMappings, assignDoctor, unassignDoctor } = useMappingStore();
  const { doctors, fetchDoctors } = useDoctorStore();
  const { patients, fetchPatients } = usePatientStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    fetchMappings();
    fetchDoctors();
    fetchPatients();
  }, [fetchMappings, fetchDoctors, fetchPatients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignDoctor({ patientId: selectedPatient, doctorId: selectedDoctor });
      setIsDialogOpen(false);
      setSelectedPatient('');
      setSelectedDoctor('');
      fetchMappings();
    } catch (error) {
      // handled in store
    }
  };

  const handleUnassign = async (patientId, doctorId) => {
    if (window.confirm('Are you sure you want to unassign this doctor?')) {
      await unassignDoctor(patientId, doctorId);
      fetchMappings();
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Doctor-Patient Assignments</h2>
        <button className="btn btn-primary gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4" /> Assign Doctor
        </button>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Assign Doctor to Patient</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Select Patient</label>
                <select
                  className="select select-bordered w-full"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  required
                >
                  <option value="">Choose a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.fullName} - {patient.diagnosis}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Select Doctor</label>
                <select
                  className="select select-bordered w-full"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.fullName} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || !selectedDoctor || !selectedPatient}
                >
                  {isLoading ? 'Assigning...' : 'Assign Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mappings List */}
      <div className="grid gap-6">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : mappings.length === 0 ? (
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <p className="text-gray-500">
              No assignments found. Start by assigning a doctor to a patient!
            </p>
          </div>
        ) : (
          mappings.map((mapping) => (
            <div key={mapping._id} className="card bg-base-100 shadow-md p-6">
              <h3 className="text-lg font-semibold">
                Patient: {mapping.patientId?.fullName || 'Unknown'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Age: {mapping.patientId?.age} | Gender: {mapping.patientId?.gender}
              </p>

              <div>
                <p className="font-medium mb-2">Assigned Doctors:</p>
                <div className="flex flex-wrap gap-2">
                  {mapping.doctorId && mapping.doctorId.length > 0 ? (
                    mapping.doctorId.map((doctor) => (
                      <div
                        key={doctor._id}
                        className="badge badge-outline flex items-center gap-2 py-3 px-4"
                      >
                        <div>
                          <p className="font-medium">{doctor.fullName}</p>
                          <p className="text-xs text-gray-500">{doctor.specialization}</p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-xs btn-circle btn-ghost"
                          onClick={() => handleUnassign(mapping.patientId._id, doctor._id)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No doctors assigned</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
