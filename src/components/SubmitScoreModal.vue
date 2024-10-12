<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" id="submit-score-modal" style="display: none;">
        <div id="modal-body" class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            <button id="close-btn" class="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onclick="toggleModal()">
                &times;
            </button>
            <h2 class="text-xl font-bold mb-4">Submit Score!</h2>
            <p class="text-gray-200 mb-4">
                You got <span class="green">{{ correct }}</span> flags correct out of {{ numberOfFlags }} flags.
            </p>
            <input type="text" class="text-gray-600 w-full p-2 rounded border border-gray-300" placeholder="Enter your name" /> 
            <button class="primary-btn px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600" @click="$emit('submit-score')">Submit</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        correct: Number,
        numberOfFlags: Number
    }
}

</script>


<style scoped>
#modal-body {
    border-radius: 45px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #071527;
    backdrop-filter: blur(2px);
    color: white;
}
.primary-btn {
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: #071527;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(3px);
    color: #FFF;
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.15);
    font-family: Outfit;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

#close-btn {
    border-radius:100%;
    padding: 6px 12px;
}

button:hover {
    background: #071527;
    border: 1px solid #51bda8;
    color: #51bda8;
}

.green {
    color: #51bda8;
}

</style>