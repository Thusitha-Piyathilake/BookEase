import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";

import serviceService from "../../services/serviceService";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    location: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!id) return;

    loadService();
  }, [id]);

  const loadService = async () => {
    try {
      const service = await serviceService.getServiceById(id!);

      setFormData({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price.toString(),
        duration: service.duration.toString(),
        location: service.location,
        imageUrl: service.imageUrl || "",
      });
    } catch (error) {
      alert("Failed to load service.");
      navigate("/provider/services");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await serviceService.updateService(id!, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        duration: Number(formData.duration),
        location: formData.location,
        imageUrl: formData.imageUrl,
      });

      alert("Service updated successfully!");

      navigate("/provider/services");
    } catch (error) {
      alert("Failed to update service.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading...</h2>;
  }

  return (
    <>
      <ProviderSidebar />

      <ProviderTopbar />

      <main
        style={{
          marginLeft: "260px",
          padding: "40px",
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            padding: "35px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h1
            style={{
              color: "#A31D1D",
              marginBottom: "25px",
            }}
          >
            Edit Service
          </h1>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              style={textareaStyle}
            />

            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="duration"
              type="number"
              placeholder="Duration (Minutes)"
              value={formData.duration}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={saving}
              style={buttonStyle}
            >
              {saving ? "Updating..." : "Update Service"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
} as const;

const textareaStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
  resize: "vertical" as const,
} as const;

const buttonStyle = {
  width: "100%",
  background: "#D84040",
  color: "#fff",
  border: "none",
  padding: "15px",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
} as const;