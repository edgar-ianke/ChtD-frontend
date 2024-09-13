import { useSelector } from "react-redux";
import store, { RootState } from "../../services/store";
import { Modal } from "../modal/modal";
import { TaskForm } from "../newTask/new-task";
import { TaskDetails } from "../task-details/task-details";
import Header from "../header";
import Footer from "../footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "../homePage";
import SignUpPage from "../signin-signup/signup";
import SignInPage from "../signin-signup/signin";
import { useEffect } from "react";
import { auth, closeEditModal } from "../../services/features/userSlice";
import {
  closeTaskDetailsModal,
  closeTaskListModal,
  closeTaskModal,
  getTodoLists,
} from "../../services/features/toDosSlice";
import { ProfilePage } from "../profile-page";
import { EditProfileForm } from "../editProfile";
import { TaskListForm } from "../new-tasklist";

function App() {
  const { taskFormVisible, taskDetailsVisible, taskListFormVisible } = useSelector((state: RootState) => state.toDos);
  const { editProfileVisible } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    store.dispatch(auth());
    store.dispatch(getTodoLists());
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" element={<ProfilePage />}>
          {editProfileVisible && (
            <Route
              path="edit"
              element={
                <Modal closeFunc={closeEditModal()} redirectTo="/profile">
                  <EditProfileForm />
                </Modal>
              }
            />
          )}
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<HomePage />}>
          {taskFormVisible && (
            <Route
              path="/new-task"
              element={
                <Modal closeFunc={closeTaskModal()}>
                  <TaskForm />
                </Modal>
              }
            />
          )}
          {taskListFormVisible && (
            <Route
              path="/new-tasklist"
              element={
                <Modal closeFunc={closeTaskListModal()}>
                  <TaskListForm />
                </Modal>
              }
            />
          )}
          {taskDetailsVisible && (
            <Route
              path="/task/:taskId"
              element={
                <Modal closeFunc={closeTaskDetailsModal()}>
                  <TaskDetails />
                </Modal>
              }
            />
          )}
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
