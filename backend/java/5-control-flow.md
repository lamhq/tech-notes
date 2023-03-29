# Control Flow Statements

## `if` Statement

```java
if (isMoving){
    // the "then" clause: decrease current speed
    currentSpeed--;
}

if (testscore >= 90) {
    grade = 'A';
} else if (testscore >= 80) {
    grade = 'B';
} else {
    grade = 'F';
}
```


## `switch` Statement
```java
switch (month) {
    case 1:  monthString = "January";
        break;
    case 2:  monthString = "February";
        break;
    case 3:  monthString = "March";
        break;
    case 4:  monthString = "April";
        break;
    case 5:  monthString = "May";
        break;
    default: monthString = "Invalid month";
        break;
}
```


## `while` and `do-while` Statements

```java
while (expression) {
    statement(s)
}

do {
    statement(s)
} while (expression);
```


## `for` Statement

```java
for(int i=1; i<11; i++){
    System.out.println("Count is: " + i);
}

int[] numbers = {1,2,3,4,5,6,7,8,9,10};
for (int item : numbers) {
    System.out.println("Count is: " + item);
}
```


## `break` Statement

```java
int i;
boolean foundIt = false;
for (i = 0; i < arrayOfInts.length; i++) {
    if (arrayOfInts[i] == searchfor) {
        foundIt = true;
        break;
    }
}
```

## `continue` Statement

```java
for (int i = 0; i < max; i++) {
    // interested only in p's
    if (searchMe.charAt(i) != 'p')
        continue;

    // process p's
    numPs++;
}
```

## `return` Statement

The `return` statement exits from the current method, and control flow returns to where the method was invoked.

The `return` statement has two forms: one that returns a value, and one that doesn't

```java
return ++count;
return;
```