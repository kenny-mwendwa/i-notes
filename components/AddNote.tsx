import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";
import { MdClose } from "react-icons/md";

type FormValues = {
  title: string;
  category: string;
  content: string;
};

export default function AddNote() {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  async function onSubmit(values: FormValues) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const res = await fetch("http://localhost:3000/api/register", options);

    if (res.status === 201) return setShowModal(false);
  }

  return (
    <>
      <button
        onClick={handleModalToggle}
        className="mb-4 flex items-center rounded-lg border border-gray-400 bg-transparent px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-800 hover:bg-gray-800 hover:text-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200">
        <HiPlus className="mr-1 h-5 w-5" />
        Add Note
      </button>

      {/* Modal */}
      {showModal && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-4 shadow sm:p-5">
            {/* Modal header */}
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Note
              </h3>
              <button
                type="button"
                onClick={handleModalToggle}
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                data-modal-toggle="defaultModal">
                <MdClose className="h-6 w-6" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-blue-600"
                    placeholder="Type note title"
                    required
                    {...register("title")}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <select
                    id="category"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    {...register("category")}>
                    <option value="Personal">Personal</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Goals">Goals</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Recipes">Recipes</option>
                    <option value="Health and Fitness">
                      Health and Fitness
                    </option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="body"
                    className="mb-2 block text-sm font-medium text-gray-900">
                    Note Content
                  </label>
                  <textarea
                    id="content"
                    rows={4}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Write your note content here"
                    {...register("content")}></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <HiPlus className="mr-1 h-5 w-5" />
                Add new note
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
