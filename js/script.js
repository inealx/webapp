$(document).ready(function() {
    const articleList = $('#article-list');
    const articleContent = $('#article-content');

    articleContent.hide();

    $('.article-link').on('click', function(e) {
        e.preventDefault();
        const filename = $(this).data('file');
        loadArticle(filename);
    });

    function loadArticle(filename) {
        $.ajax({
            url: `./articles/${filename}`,
            dataType: 'text',
            success: function(markdown) {
                const htmlContent = marked.parse(markdown);
                articleContent.html(`<button id="back-button">Kembali</button>`).append(htmlContent);
                articleContent.show();
                articleList.hide();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Gagal memuat artikel:', textStatus, errorThrown);
                articleContent.html(`<p>Maaf, artikel tidak dapat dimuat.</p>`);
                articleContent.show();
                articleList.hide();
            }
        });
    }

    // Tangani tombol kembali
    $(document).on('click', '#back-button', function() {
        articleContent.hide();
        articleList.show();
    });
});