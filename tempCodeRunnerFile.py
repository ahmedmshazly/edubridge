def parse_schema(schema_text):
    schemas = {}
    current_path = []  # Stack to track current schema context

    def ensure_path(path):
        # Ensures the nested structure in the schemas dict according to the current path
        node = schemas
        for part in path:
            if part not in node:
                node[part] = {'fields': [], 'subSchemas': {}}
            node = node[part]['subSchemas']
        return node

    def add_field(path, field_name):
        # Adds a field to the appropriate position in the schema structure
        if path:
            schema = ensure_path(path[:-1])
            schema_name = path[-1]
            if schema_name not in schema:
                schema[schema_name] = {'fields': [], 'subSchemas': {}}
            schema[schema_name]['fields'].append(field_name)

    lines = schema_text.split('\n')
    nested_structure_count = 0  # Counter to manage nested non-schema blocks

    for line in lines:
        line = line.strip()
        comment_removed = re.sub(r'//.*$', '', line).strip()  # Remove comments

        if "Schema = new mongoose.Schema({" in comment_removed:
            schema_match = re.match(r"const (\w+)Schema", line)
            if schema_match:
                # Detecting new top-level schema definition
                schema_name = schema_match.group(1)
                current_path = [schema_name]
            else:
                # Handling nested schema within another schema
                sub_schema_match = re.search(r'(\w+): new mongoose.Schema', comment_removed)
                if sub_schema_match:
                    current_path.append(sub_schema_match.group(1))
        elif '});' in line and current_path:
            # Closing a schema or a nested non-schema block
            if nested_structure_count > 0:
                nested_structure_count -= 1
            else:
                current_path.pop()
        elif '{' in line and current_path:
            # Entering a new nested block which is not a defined sub-schema
            nested_structure_count += 1
            field_name_match = re.match(r"(\w+): \{", line)
            if field_name_match:
                current_path.append(field_name_match.group(1))
        elif '}' in line and nested_structure_count > 0:
            # Exiting a nested block
            nested_structure_count -= 1
            if nested_structure_count == 0:  # Only pop if it's closing the nested structure completely
                current_path.pop()
        elif ':' in comment_removed and current_path and nested_structure_count == 0:
            # Handling fields within the schema
            field_name = comment_removed.split(':')[0].strip()
            if field_name and not field_name.startswith('{'):
                add_field(current_path, field_name)

    return schemas