# DietManagement

## About
A simple application I made to learn Node.js and Express programming back in second year of college. It can be used to track daily calories intake by creating
meal plans with various food items.

It is built using Node.js as a runtime environment, using Express framework. Data is stored into an SQLite3 database. Views are rendered using EJS and basic
Bootstrap is present, although the project did not focus on UX.

## Usage

An account can be created and then can be logged in with
a username and a passwored. Meal plans can be created for:

 - Breakfast
 - Lunch
 - Dinner

For each of the meal plans, meal items can be added or removed such as various types of meat, deserts, vegetables, fruits, etc. 
Each meal item has a certain number of calories, which can be viewed while selecting the items. In the end based on the total number of calories for all the
meal plans, a report can be generated stating whether the calories intake matches the user's BMI or not.
