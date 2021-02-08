import Swal from "sweetalert2";

export const note = {
    methods: {
        async showNote(text) {
            const { isConfirmed } = await Swal.fire({
                title: 'Are you sure?',
                text: text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            })
            return isConfirmed
        }
    }
}