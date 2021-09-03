let to_sort=[]
let my_list=document.getElementById("display")

let red="rgb(214, 83, 35)"
let blue="rgb(105,105,224)"
let dark="rgb(19, 19, 117)"

for(let i=0; i<50; i++){
    to_sort[i]=Math.floor(Math.random()*340)+20;

    let cur_item=document.createElement("div");
    cur_item.id="I"+i;
    cur_item.className="item";
    cur_item.style.height=(400-to_sort[i])+"px";

    let cur_holder=document.createElement("div");
    cur_holder.id="H"+i;
    cur_holder.className="holder";
    cur_holder.appendChild(cur_item);

    my_list.appendChild(cur_holder);
}

document.getElementById('renew_list').addEventListener('click',function(){
    for(let i=0; i<to_sort.length; i++){
        to_sort[i]=Math.floor(Math.random()*340)+20;
    
        let cur_item=document.getElementById("I"+i);
        cur_item.style.height=(400-to_sort[i])+"px";
        document.getElementById("H"+(i)).style.backgroundColor=blue;
    }
    document.getElementById('sort_button').style.display="flex";
    document.getElementById("sort_option").disabled=false;
});


let speed=10;
let time=0

function selectionSort(){
    for(let i=0; i<to_sort.length; i++){
        let min_index=i
        for(let j=i+1; j<to_sort.length; j++){
            setTimeout(function(){
                document.getElementById("H"+j).style.backgroundColor=dark;
                if(to_sort[j]<to_sort[min_index]){
                    min_index=j
                }
            },time+=speed);
            setTimeout(function(){document.getElementById("H"+j).style.backgroundColor=blue},time+=speed);
        }
        setTimeout(function(){
            let holder=to_sort[i];
            to_sort[i]=to_sort[min_index];
            to_sort[min_index]=holder;
            document.getElementById("I"+i).style.height=(400-to_sort[i])+"px";
            document.getElementById("I"+min_index).style.height=(400-to_sort[min_index])+"px";
            document.getElementById("H"+i).style.backgroundColor=dark;
        },time+=speed);
    }
}

function bubbleSort(){
    for(let i=0; i<to_sort.length-1;i++){
        for(let j=0; j<to_sort.length-1-i; j++){
            setTimeout(function(){
                document.getElementById("H"+(j)).style.backgroundColor=blue;
                if(to_sort[j]>to_sort[j+1]){
                    let holder=to_sort[j]
                    to_sort[j]=to_sort[j+1]
                    to_sort[j+1]=holder
                    document.getElementById("I"+j).style.height=(400-to_sort[j])+"px";
                    document.getElementById("I"+(j+1)).style.height=(400-to_sort[j+1])+"px";
                }
            },time+=speed);
            setTimeout(function(){document.getElementById("H"+(j+1)).style.backgroundColor=dark},time+=speed);
        }
    }
}

function insertionSort(){
    for(let i=0;i<to_sort.length;i++){
        for(let j=i;j>=0;j--){
            if(j==0||to_sort[j-1]<=to_sort[j]){
                setTimeout(function(){
                    document.getElementById("H"+j).style.backgroundColor=dark;
                },time+=speed)
                break;
            }
            let curJ=to_sort[j];
            let preJ=to_sort[j-1];
            to_sort[j]=preJ;
            to_sort[j-1]=curJ;
            setTimeout(function(){
                document.getElementById("I"+j).style.height=(400-preJ)+"px";
                document.getElementById("I"+(j-1)).style.height=(400-curJ)+"px";
                document.getElementById("H"+j).style.backgroundColor=dark;
                document.getElementById("H"+(j-1)).style.backgroundColor=blue;
            },time+=speed)
        }
    }
}

function quickSort(low=0,high=to_sort.length-1){
    if(low<high){
        //pick final item as pivot and partition
            let pivotVal=to_sort[high]
            let pivotPos=low-1 //all value appearing before pivotPos will be smaller than pivotVal
            for(let iter=low;iter<=high-1;iter++){
                if(to_sort[iter]<pivotVal){
                    pivotPos++
                    let holder1=to_sort[pivotPos]
                    let holder2=to_sort[iter]
                    to_sort[pivotPos]=holder2
                    to_sort[iter]=holder1
                    setTimeout(function(){
                        document.getElementById("I"+pivotPos).style.height=(400-holder2)+"px";
                        document.getElementById("H"+pivotPos).style.backgroundColor=dark;
                        document.getElementById("I"+iter).style.height=(400-holder1)+"px";
                        document.getElementById("H"+iter).style.backgroundColor=dark;
                    },time+=speed)
                }
            }
            let holder1=to_sort[pivotPos+1]
            let holder2=to_sort[high]
            to_sort[pivotPos+1]=holder2
            to_sort[high]=holder1
            setTimeout(function(){
                document.getElementById("I"+(pivotPos+1)).style.height=(400-holder2)+"px";
                document.getElementById("H"+(pivotPos+1)).style.backgroundColor=dark;
                document.getElementById("I"+high).style.height=(400-holder1)+"px";
            },time+=speed)
        //left side recursion
            quickSort(low,pivotPos)
        //right side recursion
            quickSort(pivotPos+2,high)
    }
}

function mergeSort(from=0,to=to_sort.length-1){
        if(to<from)return[]
        if(to==from)return[to_sort[to]]
    //find middle index
        let mid=Math.floor((from+to)/2)
    //mergeSort first half
        let first_half=mergeSort(from,mid)
    //mergeSort second half
        let second_half=mergeSort(mid+1,to)
    //merge both halves
        let result=[]
        while(first_half.length!=0&&second_half.length!=0){
            if(first_half[0]<second_half[0])
                result.push(first_half.shift())
            else
                result.push(second_half.shift())
        }
        result.push(...first_half)
        result.push(...second_half)
    //copy to diplay on UI
        for(let i=0;i<result.length;i++){
            let cur_item=result[i]
            setTimeout(function(){
                document.getElementById("I"+(from+i)).style.height=(400-cur_item)+"px";
                document.getElementById("H"+(from+i)).style.backgroundColor=dark;
            },time+=speed)
        }
    //return
        return result
}

function heapify(heap_len, root){ //heapify is to push a root down if it is smaller than at least 1 of its child
    let largest = root; // Initialize largest as root
    let left = 2 * root + 1; // left = 2*i + 1
    let right = 2 * root + 2; // right = 2*i + 2

    // If left child is larger than root
        if (left < heap_len && to_sort[left] > to_sort[largest])
            largest = left;

    // If right child is larger than largest so far
        if (right < heap_len && to_sort[right] > to_sort[largest])
            largest = right;

    // if root is not smaller than any of its 2 children --> swap with root
        if (largest != root) {
            let swap1 = to_sort[root];
            let swap2 = to_sort[largest];
            to_sort[root] = swap2;
            to_sort[largest] = swap1;

            let I=root
            let L=largest
            setTimeout(function(){
                document.getElementById("I"+I).style.height=(400-swap2)+"px";
                document.getElementById("I"+L).style.height=(400-swap1)+"px";
            },time+=speed)

            // Recursively heapify the affected sub-tree
            heapify(heap_len, largest);
        }
}

function heapSort(){
    // Build heap (rearrange array) by iteratively pushing each node down to its children if the node is smaller than its children 
        for (let i = Math.floor(to_sort.length / 2) - 1; i >= 0; i--)
            heapify(to_sort.length, i);
    // One by one extract an element from heap and placing it at the correct ending spot
        for (let i = to_sort.length - 1; i > 0; i--) {
            // Move current root to end
                let temp1 = to_sort[0];
                let temp2 = to_sort[i];
                to_sort[0] = temp2;
                to_sort[i] = temp1;
            // display on UI
                setTimeout(function(){
                    document.getElementById("I"+i).style.height=(400-temp1)+"px";
                    document.getElementById("H"+i).style.backgroundColor=dark;
                    document.getElementById("I"+0).style.height=(400-temp2)+"px";
                    document.getElementById("H"+0).style.backgroundColor=dark;
                },time+=speed)
            // call max heapify on the reduced heap rebuild the heap by finding a correct heap sort for the swapped root
                heapify(i, 0);
        }
}

document.getElementById('sort_button').addEventListener('click',function(){
    //block button for algo to run
        let option=document.getElementById("sort_option").selectedIndex;
        document.getElementById('renew_list').style.backgroundColor="white";
        document.getElementById("renew_list").disabled=true;
        document.getElementById('sort_button').style.display="none";
        document.getElementById("sort_option").disabled=true;
    //run algo and unblock "renew button" once algo is done
        if(option==0){ //selection sort
            selectionSort()
        }
        else if(option==1){ //bubble sort
            bubbleSort()
        }
        else if(option==2){ //insertion sort
            insertionSort()
        }
        else if(option==3){ //quick sort
            quickSort()
        }
        else if(option==4){ //merge sort
            mergeSort()
        }
        else{ //heap sort
            heapSort()
        }
    //unblock button and reset time to 0 after algo complete its job
        setTimeout(function(){
            document.getElementById("H0").style.backgroundColor=dark;
            document.getElementById("H49").style.backgroundColor=dark;
            document.getElementById('renew_list').style.backgroundColor=red;
            document.getElementById("renew_list").disabled=false;
            time=0;
        },time);
});
