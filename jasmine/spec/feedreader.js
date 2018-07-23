/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

       it('have an URLs', function() {
         allFeeds.forEach(function(element) {
           expect(element.url).toBeDefined();
           expect(element.url).not.toBe(0);

           let urlStart = element.url.substr(0,5);
           expect(urlStart).toMatch("http:" || "https");
         });
      });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

       it('have a name', function() {
         allFeeds.forEach(function(element) {
           expect(element.name).toBeDefined();
           expect(element.name).not.toBe(0);
           expect(typeof element.name).toBe("string");
         });
      });



    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {
      const body = document.querySelector("body");
      let menuHidden = body.classList.contains("menu-hidden")
      let menu= document.querySelector(".menu-icon-link")

      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */

       it('hidden by default', function () {
                   expect(body.className).toContain("menu-hidden");
       });;

       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

      it("visibility changes when clicked", function() {
        menu.click();
        expect(body.className).not.toContain("menu-hidden");
        menu.click();
        expect(body.className).toContain("menu-hidden");
        });
      });


    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
     beforeEach( function (done){
       loadFeed(0 , function() {
        done();
      });
     });

     it('are defined with at lease one element within .feed container', function() {
        const feedContainer = document.querySelector(".feed");
        const entryClass = document.getElementsByClassName("entry");

         expect(entryClass.length).not.toBe(0); // make sure there is at lease 1 .entry
         expect(feedContainer.contains(entryClass[0])).toBe(true); // make sure .feed is parent element of .entry
       });

     });

    /* TODO: Write a new test suite named "New Feed Selection" */


         describe('New Feed Selection', function() {

       /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */

        let initialfirstEntry;

          beforeEach( function (done){
            loadFeed(0 , function() {
              initialfirstEntry = document.querySelector(".entry h2").innerText;
              });
           loadFeed(1 , function() {
             done();
           });
          });

          it('changes content', function() {
            let newfirstEntry = document.querySelector(".entry h2").innerText;
              expect(initialfirstEntry).not.toBe(newfirstEntry);
            });
          });

}());
