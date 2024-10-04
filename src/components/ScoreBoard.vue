<template>
    <div class="container score-board">
        <h2 class="mb-8 font-bold text-2xl">Score</h2>
        <p>
            <strong class="text-green-500">Correct: </strong> <span>{{ correct }}</span>
        </p>
        <p>
            <strong class="text-red-500">Wrong: </strong> <span>{{ wrong }}</span>
        </p>
    </div>
</template>


<script>

export default {
    props: {
        correct: Number,
        wrong: Number
    }
}

</script>


<style>
.score-board {
    background: #efefef;
    border-radius:24px;
    padding:24px;
}
</style>