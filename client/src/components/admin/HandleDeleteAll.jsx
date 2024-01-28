import Swal from "sweetalert2";

const handleDeleteAll = async (selectedRows) => {
  try {
    if (selectedRows.length === 0) {
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
      text: 'Once deleted, you will not be able to recover these users!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    });

    if (result.isConfirmed) {
      await fetch(`${process.env.REACT_APP_SERVERURL}/delete-multiple`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedRows }),
      });

      Swal.fire({
        icon: 'success',
        title: 'Selected users deleted successfully!',
        showConfirmButton: false,
        timer: 3000
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
    });
  }
};

export default handleDeleteAll;
