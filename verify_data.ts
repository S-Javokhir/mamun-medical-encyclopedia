import { articles, departments, medicalCurriculumData } from "./src/data/library";

console.log("Checking Department Counts:");
departments.forEach((dept) => {
  const count = articles.filter((a) => a.departmentSlug === dept.slug).length;
  if (count !== dept.articleCount) {
    console.error(`❌ Mismatch for ${dept.name}: Expected ${count}, found ${dept.articleCount}`);
  } else {
    console.log(`✅ ${dept.name}: ${count}`);
  }
});

console.log("\nChecking Category Counts (Partial):");
// Simplified check for top-level subjects
medicalCurriculumData.forEach((subject) => {
  // This is more complex because of nesting, but we'll just log
  console.log(`${subject.title}: ${subject.articleCount} articles`);
});
