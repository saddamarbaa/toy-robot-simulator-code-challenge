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

**PLACE**

- Will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.

- The origin (0,0) can be considered to be the SOUTH WEST most corner.

**MOVE**

- Will move the toy robot one unit forward in the direction it is currently facing.

**LEFT and RIGHT**

- Will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

**REPORT**

- Will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

- A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT and REPORT commands.

- Input can be from a file, or from standard input, as the developer chooses. . Provide test data to exercise the application.

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

1. Install node.js https://nodejs.org/en/.

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
  npm start (This will open a terminal and give you options for entering your own command or read command from the existing file,
  follow the instructions and type 'f' to read 4 test cases from file, validate and run the app or type your own command)
```

6. Testing the application.

```bash
  npm run test (This will run all the unit tests case provided in __tests__/ file)
```

7. Add additional test cases.

```bash
  To add additional test cases, check the testData folder and replace the test case in the files
  (testCase1.txt, or testCase2.txt or testCase3.txt) with your own test cases
```

## Technologies

- JavaScript
- Node.js
- Jest

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

## Screenshots

## Run test screenshot

![Screenshot (554)](https://user-images.githubusercontent.com/51326421/200133057-222ece53-1916-48f4-94d4-7ff37b0c170a.png)

## Read from file screenshot

![Screenshot (547)](https://user-images.githubusercontent.com/51326421/200133118-1ee14ecd-4d0b-4f40-b066-642a2735e948.png)

## Type your own command screenshot

![Screenshot (552)](https://user-images.githubusercontent.com/51326421/200133173-48e2c0e2-54d9-4e97-a4a0-7665e6f00626.png)
