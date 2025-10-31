import { useEffect, useState } from 'react';
import { useDoctorStore } from '../../stores/doctorStore';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Doctors() {
  const { doctors, isLoading, fetchDoctors, createDoctor, updateDoctor, deleteDoctor } =
    useDoctorStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    specialization: '',
    experience: '',
    contact: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor._id, formData);
      } else {
        await createDoctor(formData);
      }
      closeModal();
      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({ fullName: '', specialization: '', experience: '', contact: '' });
    setEditingDoctor(null);
  };

  const closeModal = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      experience: doctor.experience,
      contact: doctor.contact,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await deleteDoctor(id);
      fetchDoctors();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Doctors Management</h2>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Doctor
        </button>
      </div>

      {/* Table Section */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title">All Doctors</h3>

          {isLoading ? (
            <p className="text-center py-8 text-gray-500">Loading...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No doctors found. Add your first doctor!
            </p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Contact</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor._id}>
                      <td className="font-medium">{doctor.fullName}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.experience} years</td>
                      <td>{doctor.contact}</td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleEdit(doctor)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            className="btn btn-error btn-sm text-white"
                            onClick={() => handleDelete(doctor._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Section */}
      {isDialogOpen && (
        <dialog id="doctor_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="form-control">
                <label className="label" htmlFor="fullName">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Specialization */}
              <div className="form-control">
                <label className="label" htmlFor="specialization">
                  <span className="label-text">Specialization</span>
                </label>
                <input
                  id="specialization"
                  type="text"
                  placeholder="Cardiologist"
                  className="input input-bordered w-full"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  required
                />
              </div>

              {/* Experience */}
              <div className="form-control">
                <label className="label" htmlFor="experience">
                  <span className="label-text">Experience (years)</span>
                </label>
                <input
                  id="experience"
                  type="number"
                  placeholder="5"
                  className="input input-bordered w-full"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                />
              </div>

              {/* Contact */}
              <div className="form-control">
                <label className="label" htmlFor="contact">
                  <span className="label-text">Contact</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  placeholder="9876543210"
                  className="input input-bordered w-full"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
              </button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
