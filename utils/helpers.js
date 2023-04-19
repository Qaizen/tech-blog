// Exporting an object with two functions that can be used elsewhere in the application
module.exports = {
  
    // A function that takes in a date and returns the date formatted as "MM/DD/YYYY"
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getDate()}/${new Date(date).getFullYear()}`;
    },
  
    // A function that takes in a word and a number and returns the plural version of the word if the number is not 1
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    }
  };
  