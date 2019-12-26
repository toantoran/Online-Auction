function validate() {
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const pass = $('#pass').val().trim();
    const repass = $('#re-pass').val().trim();
    const address = $('#address').val().trim();
    const captcha = $('#captcha')

    const msg = $('#msg')

    if (name == null || name == '') {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Họ tên không được để trống');
        return false;
    }
    if (email == null || email == '') {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Email không được để trống');
        return false;
    }
    if (pass == null || pass == '') {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Mật khẩu không được để trống');
        return false;
    }
    if (repass == null || repass == '') {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Vui lòng xác nhận lại mật khẩu');
        return false;
    }
    if (address == null || address == '') {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Địa chỉ không được để trống');
        return false;
    }
    if (!email.toLowerCase().match(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm)) {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Email không hợp lệ');
        return false;
    }
    if (pass.length < 8 || pass.length > 16) {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Mật khẩu phải có độ dài từ 8-16 ký tự');
        return false;
    }
    if (repass !== pass) {
        msg.html('<i class="fas fa-exclamation-circle"></i>&nbsp;Mật khẩu nhập lại không trùng khớp');
        return false;
    }

    msg.html('');
    return true;
}