import Swal, { SweetAlertIcon } from 'sweetalert2';
export class SweetAlert {
    async AlertConfirm(Title, Text, Type) {
        const a = await Swal.fire({
            title: Title,
            text: Text,
            icon: Type,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            confirmButtonColor: '#f64e60'

        });
        return a.isConfirmed;
    }

    Default(Title, Text, Type) {
        Swal.fire(Title, Text, Type);
    }
}