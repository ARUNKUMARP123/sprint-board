import { useState } from "react";


function App() {
  const [columns, setColumns] = useState([
    { id: 1, title: "Todo", color: "#cfe2ff" },
    { id: 2, title: "In Progress", color: "#fff3cd" },
    { id: 3, title: "Done", color: "#d1e7dd" },
  ]);

  const [columnCount, setColumnCount] = useState(3);
  const [editingId, setEditingId] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

// Add or remove columns
  const updateColumns = (count) => {
    let updated = [...columns];

    if (count > updated.length) {
      for (let i = updated.length + 1; i <= count; i++) {
        updated.push({
          id: Date.now() + i,
          title: `Column ${i}`,
          color: "#f8f9fa",
        });
      }
    } else {
      updated = updated.slice(0, count);
    }

    setColumns(updated);
    setColumnCount(count);
  };

  // Edit column
  const handleEdit = (id, field, value) => {
    const updated = columns.map((col) =>
      col.id === id ? { ...col, [field]: value } : col
    );

    setColumns(updated);
  };

  // Move columns
  const moveColumn = (currentIndex, newIndex) => {
    if (newIndex < 0 || newIndex >= columns.length) return;

    const updated = [...columns];

    const [removed] = updated.splice(currentIndex, 1);

    updated.splice(newIndex, 0, removed);

    setColumns(updated);
  };

  // Drag Start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Drop
  const handleDrop = (index) => {
    const updated = [...columns];

    const draggedItem = updated[draggedIndex];

    updated.splice(draggedIndex, 1);

    updated.splice(index, 0, draggedItem);

    setColumns(updated);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">
        Sprint 1 Extra Challenge Board
      </h1>

      {/* Controls */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
        <button
          className="btn btn-danger"
          onClick={() =>
            updateColumns(Math.max(1, columnCount - 1))
          }
        >
          -
        </button>

        <input
          type="number"
          min="1"
          value={columnCount}
          onChange={(e) =>
            updateColumns(Number(e.target.value))
          }
          className="form-control text-center"
          style={{ width: "100px" }}
        />

        <button
          className="btn btn-success"
          onClick={() => updateColumns(columnCount + 1)}
        >
          +
        </button>
      </div>

      {/* Grid */}
      <div className="row">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="col"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <div
              className="card p-3 mb-3"
              style={{
                backgroundColor: column.color,
                minHeight: "350px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>{column.title}</h4>

                <button
                  className="btn btn-dark btn-sm"
                  onClick={() =>
                    setEditingId(
                      editingId === column.id ? null : column.id
                    )
                  }
                >
                  Edit
                </button>
              </div>

              {/* Edit Section */}
              {editingId === column.id && (
                <div className="bg-light p-3 rounded mb-3">
                  <input
                    type="text"
                    value={column.title}
                    placeholder="Column Title"
                    className="form-control mb-2"
                    onChange={(e) =>
                      handleEdit(
                        column.id,
                        "title",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="color"
                    value={column.color}
                    className="form-control form-control-color mb-2"
                    onChange={(e) =>
                      handleEdit(
                        column.id,
                        "color",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="text"
                    value={column.color}
                    placeholder="#ffffff"
                    className="form-control"
                    onChange={(e) =>
                      handleEdit(
                        column.id,
                        "color",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              {/* Move Buttons */}
              <div className="d-flex gap-2 mt-auto">
                <button
                  className="btn btn-primary w-50"
                  onClick={() =>
                    moveColumn(index, index - 1)
                  }
                >
                  Left
                </button>

                <button
                  className="btn btn-secondary w-50"
                  onClick={() =>
                    moveColumn(index, index + 1)
                  }
                >
                  Right
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;