
# Angular13 AG Grid Test with Springboot and SockJS/STOMP!
Hello Everyone, I tried to test AG Grid with heavy load with Middle Tier running as spring boot app exposing Websocket using SockJS and STOMP. 
**Learning Reference**: Spring Website, AG Grid Documentation, Angular.io

# Files
Run Springboot app code from spring-boot folder in your favorite IDE (Eclipse/Idea) with Java 8.
>**mvn clean install** then run Application.java

Run Angular 13 code. I ran in VS Code. 
>**npm install**  (Check edit section below)
>**ng serve**

## Edit:
~~Webworker aren't supported with Angular CLI. I enhanced this code to reconnect automatically with exponential backoff with Webworker referring to https://github.com/UIUXEngineering/web-worker-in-ng proof of concept.(Claps for @jerryorta-dev!)~~

Webworkers are supported in Angular!
