$(function(){

    const url = 'upload.php';
    const form = document.querySelector('form');

    var predictOnClick = goToPredict();
    var imageLink = "";
    var prediction = "";

    var post_response = "";
    var ul = $('#upload ul');

    $('#browse').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });

    // Initialize the jQuery File Upload plugin
    $('#upload').fileupload({

        // This element will accept file drag/drop uploading
        dropZone: $('#drop'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            console.log("yey" + data.files[0]);

            if($('#showimg li')) {
                console.log("print this 2");
                $('#showimg li').remove();
            }

            var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48"'+
                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');
            // Append the file name and file size
            tpl.find('p').text(data.files[0].name)
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>');

            // Add the HTML to the UL element
            data.context = tpl.appendTo(ul);

            // Initialize the knob plugin
            tpl.find('input').knob();

            // Listen for clicks on the cancel icon
            tpl.find('span').click(function(){
                // data.submit();
            });

            // Automatically upload the file once it is added to the queue
            //var jqXHR = data.submit();
            console.log("mau submit nih");
            data.submit();
            // upload and wait for further response
            // var formData = new FormData();
            // formData.append(data.files[0].name, data.files[0]);
            //
            // var xhr = new XMLHttpRequest();
            // xhr.open("POST", "myServletUrl");
            // xhr.send(formData);
            //
            // xhr.onreadystatechange = processRequest;
            //
            // function processRequest(e) {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         // do what after success
            //     }
            // }
        },

        progress: function(e, data){

            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);

            // Update the hidden input field and trigger a change
            // so that the jQuery knob plugin knows to update the dial
            data.context.find('input').val(progress).change();

            if(progress == 100){
                data.context.removeClass('working');
            }
        },

        fail:function(e, data){
            // Something has gone wrong!
            data.context.addClass('error');
        }

    });


    // Prevent the default action when a file is dropped on the window
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    // Helper function that formats the file sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }

    // document onload disable predict button
    $(document).ready(function() {
        $('#container-predict').hide();
    });



    form.addEventListener('submit', e => {
        e.preventDefault();

        const files = document.querySelector('[type=file]').files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            formData.append('files[]', file);
        }

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);

            // what to do: enable predict
            $('#predict').attr('onclick', predictOnClick);
            imageLink = response.imageLink;
            prediction = response.prediction;

        });
    });



    function goToPredict(){
        // change display
        $('#container-predict').slideUp();
        $('.image-out').attr("src", imageLink);


    }


    $('#upload-again').click(function(){
        location.reload();
    });


});

var kuda= function(data) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#2')
            .attr('src', data)
            .width(150)
            .height(200);
    };
    console.log(data);
    // reader.readAsDataURL(e.files[0]);
    console.log("abc");
}

var somefunction = function(){

};

var changeContent = function(){
    $()
}