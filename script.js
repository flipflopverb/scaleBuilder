//Z is total number of notes in a particular tuning system, for example Z=12 in the common western diatonic equal temperment system. 
//X is the number of notes in a particular scale of the system, for example X=7 for heptatonic scales in the diatonic system. X=5 for the pentatonic scales
//total number of possible scales of length X for a system with number of notes Z is less than (Z Choose X). For 12 note Equal Tempermant, the number of pentatonic scales is less than 792.
//Starting with a root note value of 0 a scale can be represented as a series of numbers in an array, where each following element in the series is a number representing the number of steps from the last. This pattern continues until the root note is reached again.
//For example the array for the major pentatonic scale in the 12 note equal temperment system is 022323. When this array is used to index the notes from the system we can get: C(root), D, E, G, A, C
//it should be noted that the elements from this array will always add to Z. This is true for any type of scale in the system. Example A) Major Pentatonic 022323 ---> 0+2+2+3+2+3 = 12 Example B) Major Heptatonic 0+2+2+1+2+2+2+1 = 12
//within the domain of all possible scales (Z Choose X) there will be many results that add up to more than or less than Z, all of those options can be immediatley eliminated from the pool.
//beyond the initial elimination the remaining scales contain many identical pairs, triplets, quartets, etc... For example 022323 is functionally identical to 032322, 032232, 023232, and 023232. This means that both the major and minor pentatonic scales are better understood as modes of the same scale. Similar to the Major and Natural Minor heptatonic Scales.
//As of now there doesn't seem to be a generalized formula for finding these matches. Brute force searching has resulted in 66 functionally different pentatonic scales (aka non-modal transpositions). 

const initializeScaleArray = function(){
    this.scaleArray = new Array;
    return{scaleArray}
}();

const noteArray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]

function scaleObject(a, b, c, d, e){

    this.scaleObj = new Array
    scaleObj.push(a, b, c, d, e) 
    this.scaleId = a+""+b+""+c+""+d+""+e
    this.scaleInterval = scaleObj
    this.scaleNotes = []
    return{scaleNotes, scaleId, scaleInterval}
}

//get the number of combinations
const Combination = function(a, b) { 
    this.scaleDomain = 0
    let Z = a
    let X = b
    let Y = Z - X
    let W = Y + 1
    this.zFactorial = a
    this.xFactorial = b
    this.yFactorial = Y
    this.wFactorial = W

    for(i=1; i<Z; i++){
        zFactorial *= i
    };

    for(i=1; i<X; i++){
        xFactorial *= i
    };


    for(i=1; i<Y; i++){
        yFactorial *= i
    };


    
    scaleDomain = (zFactorial)/((yFactorial)*(xFactorial))
    return{scaleDomain}
}

let Z = 12
let X = 5
let Y = Z - X
let W = Y + 1
let a = 1
let b = 1
let c = 1
let d = 1
let e = 1

Combination(Z, X)

//this function builds scaleObjects and if they meet certain criteria it will push them into the scaleArray
for(i=0; a<(W+1); i++){
    const scaleObj = scaleObject(a, b, c, d, e)
    interval = scaleObj.scaleInterval
    let sum = 0
    interval.forEach(element => {
        sum += element
        scaleObj.scaleNotes.push(noteArray[sum])
   });

e++

if (e > W){
e = 1
d++
}

if (d > W){    
d = 1
c++ 
}

if (c > W){
c = 1
b++
}

if (b > W){
b = 1
a++
}

if(sum == 12){
    scaleArray.push(scaleObj)
    console.log(scaleObj.scaleId, scaleObj.scaleNotes)
}
}

