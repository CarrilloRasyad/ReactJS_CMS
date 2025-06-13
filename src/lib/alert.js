import Swal from "sweetalert2"

export const alertSuccess = async(message) => {
    return Swal.fire({
        icon: 'success',
        title: "Success",
        text: message
    })
}

export const alertError = async(message) => {
    return Swal.fire({
        icon: 'error',
        title: "Error",
        text: message
    })
}

export const alertConfirm = async(message) => {
    const result = await Swal.fire({
        icon: 'question',
        title: 'Apakah anda yakin?',
        text: message,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes'
    })
    return result.isConfirmed;
}