import Swal from 'sweetalert2';

const handleDelete = async ({ item, fetchCollections }) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/collections/${item.id}`, {
        method: 'DELETE',
        // credentials: 'include', // Include credentials if necessary
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchCollections();

      Swal.fire({
        title: 'Deleted!',
        text: 'Your collection has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  } catch (error) {
    console.error('Error deleting collection:', error);
    Swal.fire('Error!', 'Something went wrong while deleting the collection.', 'error');
  }
};

export default handleDelete;
