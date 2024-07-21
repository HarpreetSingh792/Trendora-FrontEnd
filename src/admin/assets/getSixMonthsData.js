class LL {
  constructor() {
    this.head = null;
    this.tails = null;
  }

  insertFirst(val) {
    const node = new Node(val);
    if (this.tails === null) {
      this.tails = this.head;
    }
    node.next = this.head;
    this.head = node;
  }

  makeCircularList(){
    let node=this.head;
    while(node.next!=null){
        node=node.next;
    }

    this.tails.next=this.head;

  }

  getSixMonthData() {
    let currentMonths = [];
    let node = this.head;
    const currentMon = new Date().getMonth();


    for (let i = 0; i <=currentMon-6; i++) {
      node=node.next;
    }

    for(let i=0;i<6;i++){
        currentMonths.push(node.val);
        node=node.next;
    }

    return currentMonths;
  }

}

class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

const allcurrentMonths = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthList = new LL();

for (let i = allcurrentMonths.length - 1; i >= 0; i--) {
  MonthList.insertFirst(allcurrentMonths[i]);
}
MonthList.makeCircularList()
export const getMonthData=MonthList.getSixMonthData()