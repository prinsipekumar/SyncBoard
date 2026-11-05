import { createContext, useContext, useState, useEffect } from "react";
import { initialUsers, initialAssignments } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users] = useState(initialUsers);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("je_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("je_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("je_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("je_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("je_assignments", JSON.stringify(assignments));
  }, [assignments]);

  const login = (email) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim(),
    );
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return {
      success: false,
      message: "No registered profile matches this email address.",
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const getAdminMappingId = (userObj) => {
    if (!userObj) return "";
    if (userObj.id === "admin-1") return "first-admin";
    if (userObj.id === "admin-2") return "second-admin";
    return userObj.id;
  };

  const addAssignment = (data) => {
    const subMap = {};
    data.assignedTo.forEach((id) => {
      subMap[id] = { status: "Not Submitted", submittedAt: null };
    });
    const newTask = {
      id: `asgn-${Date.now()}`,
      createdBy: getAdminMappingId(currentUser), // Uses mapping id for safety
      submissions: subMap,
      ...data,
    };
    setAssignments((prev) => [...prev, newTask]);
  };

  const editAssignment = (id, fields) => {
    setAssignments((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const subs = { ...t.submissions };
        fields.assignedTo.forEach((sid) => {
          if (!subs[sid])
            subs[sid] = { status: "Not Submitted", submittedAt: null };
        });
        return { ...t, ...fields, submissions: subs };
      }),
    );
  };

  const deleteAssignment = (id) =>
    setAssignments((prev) => prev.filter((t) => t.id !== id));

  const submitAssignment = (id) => {
    setAssignments((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        const exactStudentKey =
          Object.keys(t.submissions).find(
            (k) => k.toLowerCase() === currentUser.id.toLowerCase(),
          ) || currentUser.id;

        return {
          ...t,
          submissions: {
            ...t.submissions,
            [exactStudentKey]: {
              status: "Submitted",
              submittedAt: new Date().toISOString().split("T")[0],
            },
          },
        };
      }),
    );
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        setCurrentUser,
        assignments,
        addAssignment,
        editAssignment,
        deleteAssignment,
        submitAssignment,
        login,
        logout,
        adminMappingId: getAdminMappingId(currentUser),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
