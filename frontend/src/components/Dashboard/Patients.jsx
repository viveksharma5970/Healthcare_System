import { useEffect, useState } from 'react';
import { usePatientStore } from '../../stores/patientStore';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Patients() {
  const { patients, isLoading, fetchPatients, createPatient, updatePatient, deletePatient } = usePatientStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    address: '',
    diagnosis: '',
  });

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        await updatePatient(editingPatient._id, formData);
      } else {
        await createPatient(formData);
      }
      setIsDialogOpen(false);
      resetForm();
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({ fullName: '', age: '', gender: '', address: '', diagnosis: '' });
    setEditingPatient(null);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData({
      fullName: patient.fullName,
      age: patient.age,
      gender: patient.gender,
      address: patient.address,
      diagnosis: patient.diagnosis,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      await deletePatient(id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Patients Management</h2>
        <button className="btn btn-primary gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Patient
        </button>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-md">
            <h3 className="font-bold text-lg mb-4">
              {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  required
                >
                  <option disabled value="">
                    Select gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Diagnosis</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : editingPatient ? 'Update Patient' : 'Add Patient'}
              </button>
            </form>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        {isLoading ? (
          <p className="text-center py-8 text-gray-500">Loading...</p>
        ) : patients.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No patients found. Add your first patient!</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Diagnosis</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.fullName}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.address}</td>
                  <td>{patient.diagnosis}</td>
                  <td className="flex justify-end gap-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEdit(patient)}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(patient._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
