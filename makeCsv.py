import csv
import re
import random

# Define your categories here
categories = ["General Information", "Structure & Content", "Results"]

# Function to generate random category inputs
def generate_random_categories():
    return [random.choice(["true", "false"]) for _ in categories]

def parse_schema(schema_text):
    schemas = {}
    current_path = []  # Stack to track current schema context

    def ensure_path():
        """ Ensure that all elements of the current path exist in the schema dict. """
        node = schemas
        for part in current_path:
            if part not in node:
                node[part] = {'fields': [], 'subSchemas': {}}
            node = node[part]['subSchemas']
        return node

    def add_field(field_name):
        """ Add a field to the schema at the current path. """
        schema = ensure_path()
        schema['fields'].append(field_name)

    lines = schema_text.split('\n')
    for line in lines:
        clean_line = line.strip()
        comment_removed = re.sub(r'//.*$', '', clean_line)  # Remove comments

        if "new mongoose.Schema({" in comment_removed:
            # Entering a new schema or sub-schema
            match = re.search(r'(\w+): new mongoose.Schema', comment_removed)
            if match:
                current_path.append(match.group(1))
            else:
                match = re.match(r"const (\w+)Schema", clean_line)
                if match:
                    current_path = [match.group(1)]  # Reset for top-level schema

        elif '});' in clean_line:
            if current_path:
                current_path.pop()  # Exiting a schema or nested object

        elif ':' in comment_removed and '{' not in comment_removed:
            # Possible field declaration
            field_name = comment_removed.split(':')[0].strip()
            add_field(field_name)

    return schemas

# Example schema text
schema_text = """
const MetricsSchema = new mongoose.Schema({
  courseId: Number,
  studentCompletion: {
    totalStudents: Number,
    completedAllCourses: Number,
  },
  overallStats: {
    finalScore: {
      total: Number,
      completed: Number,
    },
  },
}, { _id: false });
"""

schemas = parse_schema(schema_text)
hierarchy = []

def generate_hierarchy(schemas, parent_path=""):
    for schema_name, details in schemas.items():
        current_path = f"{parent_path}.{schema_name}" if parent_path else schema_name
        for field in details['fields']:
            hierarchy.append((f"{current_path}.{field}", generate_random_categories()))
        generate_hierarchy(details['subSchemas'], current_path)

generate_hierarchy(schemas)

# Writing to CSV with randomly assigned categories
csv_file_path = "mongoose_schemas_categorized.csv"
with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    header = ["Field Path"] + categories
    writer.writerow(header)
    for path, categories in hierarchy:
        row = [path] + categories
        writer.writerow(row)

print(f"Categorization complete. Results saved to {csv_file_path}")
