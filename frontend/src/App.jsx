import { useState } from "react";
import { FaDatabase, FaUpload, FaDownload } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [csv, setCsv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://datafix-2.onrender.com/upload";

  const uploadFile = async () => {
    if (!file) return alert("Please upload a CSV file");

    if (!file.name.endsWith(".csv")) {
      return alert("Only CSV files are allowed");
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error("Server error");

      setData(result.data || []);
      setBefore(result.before);
      setAfter(result.after);
      setCsv(result.csv);
    } catch (err) {
      setError("⚠️ Failed to process file. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_dataset.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500 p-4 flex justify-center">
        <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
          <FaDatabase /> DataFix
        </h1>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto bg-[#111] border border-yellow-500 rounded-xl p-6 shadow-lg">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            Clean Your Dataset Instantly
          </h2>

          {/* Upload */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-black border border-yellow-500 p-2 rounded"
            />

            <button
              onClick={uploadFile}
              className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition"
            >
              <FaUpload /> Upload Dataset
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center mt-6">
              <ClipLoader color="#FFD700" size={40} />
              <p className="mt-2 text-gray-400">Processing your data...</p>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}

          {/* Info Section */}
          <h2 className="text-2xl font-bold text-center text-yellow-400 mt-12 mb-6">
            How DataFix Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#111] border border-yellow-500 rounded-xl p-5 hover:scale-105 transition">
              <h3 className="text-yellow-400 font-bold mb-2">
                📁 Upload Dataset
              </h3>
              <p className="text-gray-400 text-sm">
                Upload your CSV file securely and prepare it for cleaning.
              </p>
            </div>

            <div className="bg-[#111] border border-yellow-500 rounded-xl p-5 hover:scale-105 transition">
              <h3 className="text-yellow-400 font-bold mb-2">
                🧹 Smart Cleaning
              </h3>
              <p className="text-gray-400 text-sm">
                Removes duplicates, fills missing values, and eliminates
                outliers.
              </p>
            </div>

            <div className="bg-[#111] border border-yellow-500 rounded-xl p-5 hover:scale-105 transition">
              <h3 className="text-yellow-400 font-bold mb-2">
                📊 Data Insights
              </h3>
              <p className="text-gray-400 text-sm">
                View dataset statistics before and after cleaning.
              </p>
            </div>

            <div className="bg-[#111] border border-yellow-500 rounded-xl p-5 hover:scale-105 transition">
              <h3 className="text-yellow-400 font-bold mb-2">
                📥 Download Data
              </h3>
              <p className="text-gray-400 text-sm">
                Download your cleaned dataset instantly.
              </p>
            </div>
          </div>

          {/* Table */}
          {data.length > 0 && (
            <div className="mt-10 overflow-auto">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Cleaned Data Preview
              </h3>

              <table className="w-full border border-yellow-500 text-sm">
                <thead className="bg-yellow-500 text-black">
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="p-2 border border-black">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td
                          key={i}
                          className="p-2 border border-yellow-500 text-center"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={downloadCSV}
                className="mt-4 flex items-center gap-2 bg-green-600 px-6 py-2 rounded hover:bg-green-500"
              >
                <FaDownload /> Download CSV
              </button>
            </div>
          )}

          {/* Stats */}
          {before && after && (
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div>
                <h3 className="text-yellow-400 font-bold mb-2">
                  Before Cleaning
                </h3>
                <pre className="bg-[#1a1a1a] p-4 rounded text-xs overflow-auto">
                  {JSON.stringify(before, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="text-yellow-400 font-bold mb-2">
                  After Cleaning
                </h3>
                <pre className="bg-[#1a1a1a] p-4 rounded text-xs overflow-auto">
                  {JSON.stringify(after, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500 text-center p-4 text-gray-400">
        Built with 🖤 by Jeevan
      </footer>
    </div>
  );
}
