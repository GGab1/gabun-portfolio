import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function Admin() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [access, setAccess] = useState(false);
  const [input, setInput] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  // ======================
  // FETCH PROJECTS
  // ======================
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ======================
  // LOGIN
  // ======================
  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="bg-glass p-6 rounded-xl text-white">
          <input
            type="password"
            placeholder="Mot de passe"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 rounded bg-white/10"
          />
          <button
            onClick={() => {
              if (input === import.meta.env.VITE_ADMIN_PASSWORD) {
                setAccess(true);
              }
            }}
            className="ml-2 bg-accent px-3 py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (!error) fetchProjects();
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (project) => {
    setEditingProject(project);

    setForm({
      name: project.name,
      description: project.description,
      url: project.url,
    });

    setPreview(project.image_url);
  };

  // ======================
  // RESET FORM
  // ======================
  const resetForm = () => {
    setForm({ name: "", description: "", url: "" });
    setImageFile(null);
    setPreview(null);
    setEditingProject(null);
  };

  // ======================
  // SUBMIT (ADD + UPDATE)
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let imageUrl = editingProject?.image_url || "";

    // UPLOAD IMAGE
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setMessage("❌ Upload image failed");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    // UPDATE
    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update({
          name: form.name,
          description: form.description,
          url: form.url,
          image_url: imageUrl,
        })
        .eq("id", editingProject.id);

      if (error) {
        setMessage("❌ " + error.message);
      } else {
        setMessage("✅ Projet modifié !");
        resetForm();
        fetchProjects();
      }
    }

    // INSERT
    else {
      const { error } = await supabase.from("projects").insert([
        {
          name: form.name,
          description: form.description,
          url: form.url,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        setMessage("❌ " + error.message);
      } else {
        setMessage("✅ Projet ajouté !");
        resetForm();
        fetchProjects();
      }
    }

    setLoading(false);
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-bg p-6 flex flex-col items-center text-white">
      <div className="bg-glass p-8 rounded-3xl w-full max-w-xl border border-white/10">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 bg-white/10 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 bg-white/10 rounded"
            required
          />

          {/* IMAGE */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                setImageFile(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="border border-dashed border-white/20 p-6 rounded text-center cursor-pointer"
          >
            {preview ? (
              <img src={preview} className="max-h-40 mx-auto object-contain" />
            ) : (
              <p>Drop image here</p>
            )}
          </div>

          <input
            type="text"
            placeholder="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="p-3 bg-white/10 rounded"
            required
          />

          <button className="bg-accent text-black py-3 rounded font-semibold">
            {loading ? "Loading..." : editingProject ? "Update" : "Add"}
          </button>

          {editingProject && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-white/60"
            >
              Cancel edit
            </button>
          )}
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>

      {/* LIST */}
      <div className="mt-10 w-full max-w-xl">
        <h2 className="text-xl mb-4">Projects</h2>

        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-white/10 p-3 rounded"
            >
              <div className="flex items-center gap-3">
                <img src={p.image_url} className="w-12 h-12 object-contain" />
                <span>{p.name}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-2 py-1 bg-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
