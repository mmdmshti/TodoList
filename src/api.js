let mockTodos = [
    { id: "1", title: "Mock Task 1", statu: false },
    { id: "2", title: "Mock Task 2", statu: true }
  ];
  
// mockApi.js
export const getTodos = () => {
    console.log("[MOCK] getTodos called");
    return new Promise(resolve => {
      setTimeout(() => resolve({ data: [...mockTodos] }), 300);
    });
  };
  
  
  export const addTodo = (todo) => {
    console.log("[MOCK] addTodo called with", todo);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = { id: Date.now().toString(), ...todo };
        mockTodos.push(newItem);
        resolve({ data: newItem });
      }, 300);
    });
  };
  
  export const deleteTodo = (id) => {
    console.log("[MOCK] deleteTodo called with id", id);
    return new Promise((resolve) => {
      setTimeout(() => {
        mockTodos = mockTodos.filter(item => item.id !== id);
        resolve({ data: { message: "deleted" } });
      }, 300);
    });
  };
  
  export const updateTodo = (id, data) => {
    console.log("[MOCK] updateTodo called for id", id, "with data", data);
    return new Promise((resolve) => {
      setTimeout(() => {
        // اول آیتم قدیمی را پیدا می‌کنیم
        const existing = mockTodos.find(item => item.id === id);
        if (!existing) {
          return resolve({ data: null });
        }
        // بعد تمام فیلدهای قدیمی + فیلدهای جدید را با هم ادغام می‌کنیم
        const updatedItem = { ...existing, ...data };
        // و به آرایه بازنویسی‌شده اختصاص می‌دهیم
        mockTodos = mockTodos.map(item =>
          item.id === id ? updatedItem : item
        );
        console.log("[MOCK] updated item:", updatedItem);
        resolve({ data: updatedItem });
      }, 300);
    });
  };
  
  // ===== real api.js =====
// کافیست این فایل رو جایگزین mockApi.js کنی و axios نصب باشه:

// import axios from "axios";
// const API_BASE = "http://localhost:5000/api";
//
// export const getTodos = () => axios.get(`${API_BASE}/todos`);
// export const addTodo  = (todo) => axios.post(`${API_BASE}/todos`, todo);
// export const deleteTodo = (id) => axios.delete(`${API_BASE}/todos/${id}`);
// export const updateTodo = (id, data) => axios.patch(`${API_BASE}/todos/${id}`, data);

  
  