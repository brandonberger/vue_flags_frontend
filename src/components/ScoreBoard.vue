<template>
    <div class="score-board text-center lg:text-left flex">
        <h2 class="font-bold me-3">Score</h2>
        <p>
            <strong class="correct"><span>{{ correct }}</span></strong>/{{ numberOfFlags }}
        </p>
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


<style>
.score-board {
    color: white;
    padding:24px;
    border-radius: 45px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #071527;
    backdrop-filter: blur(2px);
    justify-content: space-between;
}
.score-board .correct {
    color: #52BDA8;
}
.score-board .incorrect {
    color: #9C3848;
}
</style>