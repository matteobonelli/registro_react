import {
  Table,
  TableHead,
  TableHeadCell,
  Checkbox,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Modal,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateValue } from "../../utils/dateUtils";

export interface User {
  id: string;
  name: string;
  lastname: string;
  dateOfBirth: Date;
}

const Users: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState<boolean>();
  const [idDelete, setIdDelete] = useState<string>();
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const getUsers = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users`).then((res: any) => {
      setData(res);
    });
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Funzione per cambiare pagina
  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const confirmDelete = (id: string) => {
    setIdDelete(id);
    setOpenModal(true);
  };

  const deleteUser = (id: string) => {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/users/${id}`)
      .then((res: any) => {
        getUsers();
        setOpenModal(false);
        setPage(1);
      });
  };

  const handleSelectRow = (row: User) => {
    setSelectedRows((prevRows) => {
      if (prevRows.some((r) => r.id === row.id)) {
        return prevRows.filter((r) => r.id !== row.id);
      } else {
        return [...prevRows, row];
      }
    });
  };

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-xl font-bold">Users</h1>
        <Button onClick={() => navigate("add")}>{t("add")}</Button>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell className="p-4">
            </TableHeadCell>
            <TableHeadCell>{t("name")}</TableHeadCell>
            <TableHeadCell>{t("lastname")}</TableHeadCell>
            <TableHeadCell>{t("dateOfBirth")}</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {currentItems.map((item: User, index: number) =>  (
                <TableRow
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="p-4">
                    <Checkbox
                      checked={selectedRows.some((r) => r.id === item.id)}
                      onChange={() => handleSelectRow(item)}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.lastname}</TableCell>
                  <TableCell>{formatDateValue(item.dateOfBirth)}</TableCell>
                  <TableCell>
                    <div className="flex justify-around">
                      <Link
                        to={item.id}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {t("view")}
                      </Link>
                      <Link
                        to={`${item.id}/edit`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {t("edit")}
                      </Link>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setPage}
        />
      </div>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => idDelete && deleteUser(idDelete)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Users;
