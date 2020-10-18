from rest_framework.pagination import PageNumberPagination


class PageNumberAndSizePagination(PageNumberPagination):

    page_size = 50
    page_size_query_param = 'limit'
