import axios from "axios";
import Swal from "sweetalert2";

const handleStatusToggleAll = async (selectedRows, data) => {
  if (!selectedRows || selectedRows.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'No rows selected!',
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Change status for all selected rows?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#DC3545',
    confirmButtonText: 'Yes, change them!',
  });

  if (result.isConfirmed) {
    try {
      const responses = await Promise.all(selectedRows.map(async (id) => {
        const currentStatus = data.find((userdata) => userdata.id === id)?.status;
        const newStatus = currentStatus === true ? false : true;

        return axios.put(`http://localhost:4000/update-status/${id}`, { status: newStatus });
      }));

      console.log("API Responses:", responses);

      Swal.fire({
        icon: 'success',
        title: 'Status changed successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }
};

export default handleStatusToggleAll;
