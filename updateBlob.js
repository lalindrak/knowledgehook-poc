const fs = require("fs");
const path = require("path");

//merging reports as the tests are run in two commands
// Get the argument from the command line
const arg = process.argv[2];
if (!arg) {
  console.error("Please provide an argument.");
  process.exit(1);
}

// Define the source and destination directory paths
const sourceDirectory = path.join(__dirname, "blob-report");
const destinationDirectory = path.join(__dirname, "all-blob-reports");

// Ensure the source directory exists
if (!fs.existsSync(sourceDirectory)) {
  console.error(`Source directory not found: ${sourceDirectory}`);
  process.exit(1);
}

// Find the report file with the pattern "report-*.zip"
const reportFiles = fs.readdirSync(sourceDirectory).filter(file => file.startsWith("report-") && file.endsWith(".zip"));

if (reportFiles.length === 0) {
  console.error("No report file found in the source directory.");
  process.exit(1);
}

if (reportFiles.length > 1) {
  console.warn("Multiple report files found. Using the first one found.");
}

const sourceFilePath = path.join(sourceDirectory, reportFiles[0]);
const destinationFilePath = path.join(destinationDirectory, `report_${arg}.zip`);

// Ensure the destination directory exists
fs.mkdir(destinationDirectory, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error creating directory: ${err.message}`);
    process.exit(1);
  }

  // Copy the file to the new directory with the new name
  fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
      console.error(`Error copying file: ${err.message}`);
      process.exit(1);
    }
    console.log(`File copied to: ${destinationFilePath}`);
  });
});
