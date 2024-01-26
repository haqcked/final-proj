import axios from "axios";
import Swal from "sweetalert2";

const handleStatusToggle = async (id, currentStatus) => {
  const newStatus = currentStatus === true ? false : true;

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `Change status to ${newStatus === true ? 'Active' : 'Blocked'}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#DC3545',
    confirmButtonText: 'Yes, change it!',
  });

  if (result.isConfirmed) {
    try {
      await axios.put(`${process.env.REACT_APP_SERVERURL}/update-status/${id}`, { status: newStatus });

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

export default handleStatusToggle;
