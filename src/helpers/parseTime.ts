export const parseTime = (time : number) => {

    let seconds = String(time % 60).padStart(2, "0");
    let minutes = String(Math.floor(time / 60)).padStart(2, "0");

    return {minutes, seconds}

}