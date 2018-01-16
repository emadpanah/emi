function CreateWallet(word1, word2, word3, word4, word5) {
    var json = {
        "password": word1 + " " + word2 + " " + word3 + " " + word4 + " " + word5
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3001/operator/wallets',
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#WalletId').text(data.id);
            $('#walletBox').show();
        },
        error: function (xhr) {
        }
    });

}

function AddAddressToWallet(word1, word2, word3, word4, word5, walletId) {
    var pass = word1 + " " + word2 + " " + word3 + " " + word4 + " " + word5;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3001/operator/wallets/' + walletId + '/addresses',
        beforeSend: function (xhr) { xhr.setRequestHeader('password', pass); },
        success: function (data) {
            $('#walletAdress').text(data.address);
            $('#addressBox').show();
        },
        error: function (data) {
        }
    });
}

function GetWalletIdAddresses(walletId) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3001/operator/wallets/' + walletId + '/addresses',
        success: function (data) {
            if (data != '') {
                var html;
                $.each(data, function (i, v) {
                    html += '<tr><td>' + v + '</td></tr>';
                });
                $('#addressTableBody').empty();
                $('#addressTableBody').append(html);
                $('#addressTable').show();
            }
        },
        error: function (data) {
        }
    });
}

function GetWalletBalance(addressId){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3001/operator/' + addressId + '/balance',
        success: function (data) {
            if (data != '') {
                var html = data.balance;
                
                $('#AddressBalance').empty();
                $('#AddressBalance').append(html);
                $('#balanceBox').show();
            }
        },
        error: function (data) {
        }
    });
}

function CreateTransAction(word1, word2, word3, word4, word5, fromAddress, toAddress, amout, walletId) {
    var json = {
        "fromAddress": fromAddress,
        "toAddress": toAddress,
        "amount": amout,
        "changeAddress": fromAddress
    };
    var pass = word1 + " " + word2 + " " + word3 + " " + word4 + " " + word5;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3001/operator/wallets/' + walletId + '/transactions',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) { xhr.setRequestHeader('password', pass); },
        data: JSON.stringify(json),
        success: function (data) {
            $('#transActionId').text(data.id);
            $('#transActionBox').show();
        },
        error: function (data) {
        }
    });
}

function Mine(rewardAddress) {
    var json = {
        "rewardAddress": rewardAddress
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3001/miner/mine',
        data: { 'password': json },
        success: function (data) {
            var res = JSON.parse(data);
            $('transActionId').text(res.id);
        },
        error: function (data) {
        }
    });
}

function GetTransActionConfirmation() {

}