# sharedTime

Problem:
The company ACME offers their employees the flexibility to work the hours they want.
But due to some external circumstances they need to know what employees have been at the office within the same time frame The goal of this exercise is to output a table containing pairs of employees and how often they have coincided in the office.

Input: the name of an employee and the schedule they worked, indicating the time and hours.
This should be a .txt file with at least five sets of data.
You can include the data from our examples below:

Example 1:  
INPUT RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00 ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00 ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

OUTPUT: ASTRID-RENE: 2 ASTRID-ANDRES: 3 RENE-ANDRES: 2

Example 2:

INPUT: RENE=MO10:15-12:00,TU10:00-12:00,TH13:00-13:15,SA14:00-18:00,SU20:00-21:00 ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

OUTPUT: RENE-ASTRID: 3

# Solution:

First as we are working with day divided data, I created a data structure that holds all time intervals for Mondays, tuesday , etc
Example:
Monday: [{name: 'Andres', timeInterval:[10:00-12:00]}, ........., {name:'JUAN': timeInterval:[10:00-10:30]}]
Now for all days, since all the possible time intervals can overlap between each other, it is necessary to compare each time interval with the others.

Algorithm iterates over the array ie (we start by the first Andres)
Then we compare between the others time periods, and if we find an overlap ('ANDRES-JUAN').
we add this to key to a data structure that will keep track of how many times this pair appears(KeyCounter)
After checking all possible matches of andres first time interval, we marked as visited to avoid creating repetition 
ie( ANDRES-JUAN same as JUAN-ANDRES)

Finally we just display the data on our keyCounter.

Problems with this aproach. time complexity, running this in a very large dataset, we will be doing N^2 computations.

# Solution2:

First as we are working with day divided data, I created a data structure that holds all time intervals for Mondays, tuesday , etc
Example:

Monday: [{name: 'Andres', timeInterval:[10:00-12:00]}, ........., {name:'JUAN': timeInterval:[09:59-10:30]}]

Now for all days, we want to sort the timeIntervals by start time
Example:

Monday: [ {name:'JUAN': timeInterval:[09:59-10:30]},{name: 'Andres', timeInterval:[10:00-12:00]}, .........,]

Now we need further processing data and flat the data, we are going to create a list of events that will show the start and end by time from early to late:

[{name:JUAN, type:'START, time:"09:59"}},{name:ANDRES, type:'START, time:"10:00"}.... {{name:JUAN, type:'END, time:"10:30"}, ....]

Once we processed this data, we can just iterate over the list from left to right.
Two cases here:

we see an start type, we add the name to a set

we see an eend, it will mean that there are no more overlaps,
we generate possible pairs and remove it from the list

After this, we reused our first data structure (keyCounter) to count the number of pairs repeated.

By doing the algorithm in this way, we save a lot of unnecessary computarions.

# Command line program

To execute the program from the commandline enter:

node index.js PATHTOFILE TYPE

TYPE can either be 1 or 2 for the above solutions.

PATHOFFILE must point to the data file for example ./testFiles/test5.txt

# Run tests

To run tests, please run the command
npn run test

# INSTALLATION:

node application
Requirements node (tested with v 14.15.2)
run npm install
