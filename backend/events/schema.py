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
        if "required" in result:
            new_result["required"] = list(
                map(self._to_camel_case, result["required"])
            )

        return new_result
