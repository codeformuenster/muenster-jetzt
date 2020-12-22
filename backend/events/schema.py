from rest_framework.schemas.openapi import AutoSchema


class CamelizingAutoSchema(AutoSchema):
    # Via https://github.com/vbabiy/djangorestframework-camel-case/issues/79

    def map_serializer(self, serializer):
        result = super().map_serializer(serializer)
        camelized_properties = {
            self._to_camel_case(field_name): schema
            for field_name, schema in result["properties"].items()
        }
        new_result = {"type": "object", "properties": camelized_properties}
        new_result["required"] = list(
            map(self._to_camel_case, result.get("required", []))
        ) + [
            field
            for field, schema in new_result["properties"].items()
            if schema.get("readOnly")
        ]

        return new_result

    def _get_parameters(self, path, method):
        parameters = []
        parameters += self.get_path_parameters(path, method)
        parameters += self.get_pagination_parameters(path, method)
        parameters += self.get_filter_parameters(path, method)
        return [p["name"] for p in parameters]

    def get_responses(self, path, method):
        responses = super().get_responses(path, method)
        responses["200"]["description"] = "Success"
        # Rest Framework does not include error schemas (as their exception
        # handler is a simple view, not a serializer from which a schema could
        # be inferred)
        responses["400"] = {
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            p: {"type": "array", "items": {"type": "string"}}
                            for p in self._get_parameters(path, method)
                        },
                    }
                }
            },
            "description": "Bad Request",
        }
        responses["404"] = {
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {"detail": {"type": "string"}},
                        "required": ["detail"],
                    }
                }
            },
            "description": "Not Found",
        }
        return responses
