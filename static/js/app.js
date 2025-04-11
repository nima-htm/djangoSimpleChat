        document.addEventListener('DOMContentLoaded', function () {
            const roomForm = document.getElementById('room-form');
            const createRoomInput = document.getElementById('create-room-input');
            const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
            const confirmButton = document.getElementById('confirm-button');

            roomForm.addEventListener('submit', function (event) {
                const roomName = document.getElementById('roomname-input').value;
                if (!roomName) {
                    return;
                }
                event.preventDefault();
                confirmationModal.show(); 
            });

            confirmButton.addEventListener('click', function () {
                createRoomInput.value = "true";
                roomForm.submit(); 
            });
        });