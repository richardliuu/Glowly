from django.contrib import admin
from api.models import Post, Comment, Profile, Like

# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'text_preview', 'created_date', 'image_preview', 'likes_count')
    search_fields = ('author__username', 'text')
    list_filter = ('created_date',)
    readonly_fields = ('created_date', 'image_preview')
    ordering = ('-created_date',)
    fields = ('author', 'text', 'image', 'image_preview', 'created_date', 'liked_by')

    def text_preview(self, obj):
        return obj.text[:50] + "..." if len(obj.text) > 50 else obj.text
    text_preview.short_description = "Text Preview"

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" height="100" style="border-radius:5px;"/>'
        return "No Image"
    image_preview.allow_tags = True
    image_preview.short_description = "Image Preview"

    def likes_count(self, obj):
        return obj.liked_by.count()
    likes_count.short_description = "Likes"

