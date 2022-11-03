# Toy Robot Code Challeng

- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
Create an application that can read in commands of the following form:
- PLACE X,Y,F 
- MOVE
- LEFT
- RIGHT
- REPORT

__PLACE__ 

* Will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.

* The origin (0,0) can be considered to be the SOUTH WEST most corner.


__MOVE__ 

* Will move the toy robot one unit forward in the direction it is currently facing.

__LEFT and RIGHT__ 

* Will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

__REPORT__ 

* Will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.
 
* A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT and REPORT commands.

* Input can be from a file, or from standard input, as the developer chooses. . Provide test data to exercise the application.


## Constraints

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
Any move that would cause the robot to fall must be ignored.
 
Example Input and Output:
a)
> PLACE 0,0,NORTH
>
> MOVE
>
> REPORT
>
> Output: 0,1,NORTH
 
b)
> PLACE 0,0,NORTH
>
> LEFT
>
> REPORT
>
> Output: 0,0,WEST
 
c)
> PLACE 1,2,EAST
>
> MOVE
>
> MOVE
>
> LEFT
>
> MOVE
>
> REPORT
>
> Output: 3,3,NORTH
 


## Running the application

1. Install the https://nodejs.org/en/.


2. Clone the project.

```bash
git clone https://github.com/saddamarbaa/toy-robot-simulator-code-challenge
```

3. Using a terminal, navigate to the `toy-robot-simulator-code-challenge` directory.


```bash
  cd toy-robot-simulator-code-challenge
```


4. Install dependencies.

```bash
  npm install
```

5. Start the app .


```bash
  npm start (this will read 3 test cases from file, validate and run the app)
```

6. Testing the application.

```bash
  npm run test (This will run all the unit tests case provided in __tests__/ file)
```


## Technologies
-  JavaScript
-  Node.js
-  Jest


## Status

Project is: in progress I'm working on it in my free time


## Author

### <a href="https://github.com/saddamarbaa">@Saddam Arbaa</a>



## Feedback

If you have any feedback, please reach out to me at saddamarbaas@gmail.com

Twitter
https://twitter.com/ArbaaSaddam/

Linkedin.
https://www.linkedin.com/in/saddamarbaa/

Github
https://github.com/saddamarbaa


