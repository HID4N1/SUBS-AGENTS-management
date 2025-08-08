import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  deleteMeetingPoint
} from "../../../services/adminApi";
import { Search, Plus, Edit, Trash2, ViewIcon } from "lucide-react";
import ConfirmDelete from "../../components/ConfirmDelete";
import "../../styles/LocationsPage.css"

const LocationsPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  // Form states
  const [locationForm, setLocationForm] = useState({
    name: "",
    address: "",
    description: ""
  });



  // Fetch locations
  const loadLocations = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const params = {
        page,
        search,
        per_page: 10
      };
      const response = await fetchLocations(params);
      setLocations(response.results);
      setFilteredLocations(response.results);
      setTotalPages(response.num_pages);
      setCurrentPage(response.current_page);
    } catch (err) {
      setError("Failed to load locations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Location CRUD 
  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedLocation) {
        await updateLocation(selectedLocation.id, locationForm);
      } else {
        await createLocation(locationForm);
      }
      setShowLocationModal(false);
      resetLocationForm();
      loadLocations(currentPage, searchTerm);
    } catch (err) {
      setError("Failed to save location");
      console.error(err);
    }
  };

  const handleLocationEdit = (location) => {
    setSelectedLocation(location);
    setLocationForm({
      name: location.name,
      address: location.address,
      description: location.description || ""
    });
    setShowLocationModal(true);
  };

  const handleLocationDelete = (location) => {
    setDeleteItem(location);
    setDeleteType("location");
    setShowDeleteModal(true);
  };

  const confirmDeleteLocation = async () => {
    try {
      if (deleteType === "location") {
        await deleteLocation(deleteItem.id);
      } else {
        await deleteMeetingPoint(deleteItem.id);
      }
      setShowDeleteModal(false);
      loadLocations(currentPage, searchTerm);
    } catch (err) {
      setError("Failed to delete");
      console.error(err);
    }
  };



  // Form reset functions
  const resetLocationForm = () => {
    setLocationForm({
      name: "",
      address: "",
      description: ""
    });
    setSelectedLocation(null);
  };



  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="locations-container">
      <div className="max-w-7xl mx-auto">
        <div className="locations-header">
          <h1>Locations Management</h1>
          <button
            onClick={() => {
              resetLocationForm();
              setShowLocationModal(true);
            }}
            className="add-location-btn"
          >
            <Plus size={20} />
            Add Location
          </button>
        </div>

        <div className="search-section">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search locations by name or address..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="locations-table-container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="locations-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Description</th>
                      <th>Meeting Points</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLocations.map((location) => (
                      <tr key={location.id}>
                        <td className="location-name">{location.name}</td>
                        <td className="location-address">{location.address}</td>
                        <td className="location-description">
                          {location.description || "No description"}
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <span>{location.meeting_points?.length || 0}</span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => navigate(`/admin/locations/${location.id}`)}
                              className="action-btn view-btn"
                            >
                              <ViewIcon size={20} color="black" />
                            </button>
                            <button
                              onClick={() => handleLocationEdit(location)}
                              className="action-btn edit-btn"
                            >
                              <Edit size={20} />
                            </button>
                            <button
                              onClick={() => handleLocationDelete(location)}
                              className="action-btn delete-btn"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <div className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="pagination-buttons">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {showLocationModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedLocation ? "Edit Location" : "Add New Location"}</h2>
              </div>
              <form onSubmit={handleLocationSubmit} className="modal-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={locationForm.name}
                    onChange={(e) => setLocationForm({...locationForm, name: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={locationForm.address}
                    onChange={(e) => setLocationForm({...locationForm, address: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={locationForm.description}
                    onChange={(e) => setLocationForm({...locationForm, description: e.target.value})}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    {selectedLocation ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLocationModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmDelete
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteLocation}
          itemType={deleteType}
          itemName={deleteItem?.name || ""}
          confirmText="Delete"
          cancelText="Cancel"
          title="Confirm Delete"
        />
      </div>
    </div>
  );
};

export default LocationsPage;
