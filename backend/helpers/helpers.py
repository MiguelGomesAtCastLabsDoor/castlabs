def extract_parameter_from_path(event, parameter):
    if "pathParameters" in event and isinstance(event["pathParameters"], dict):
        return event["pathParameters"].get(parameter)
