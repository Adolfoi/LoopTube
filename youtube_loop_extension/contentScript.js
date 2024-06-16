function toggleLoop() {
  let video = document.querySelector('video');
  let button = document.getElementById('loopButton');
  if (video.loop) {
    video.loop = false;
    button.style.backgroundImage = "url('chrome-extension://" + chrome.runtime.id + "/images/loop_off_image.png')"; // Loop Off時の画像
    button.textContent = ''; // テキストを消去
  } else {
    video.loop = true;
    button.style.backgroundImage = "url('chrome-extension://" + chrome.runtime.id + "/images/loop_on_image.png')"; // Loop On時の画像
    button.textContent = ''; // テキストを消去
  }
}

function injectButton() {
  let controls = document.querySelector('.ytp-right-controls');
  if (controls && !document.querySelector('#loopButton')) {
    let button = document.createElement('button');
    button.id = 'loopButton';
    button.style.padding = '0'; // パディングを0に設定
    button.style.width = '34px'; // ボタンの幅を調整
    button.style.height = '34px'; // ボタンの高さを調整
    button.style.backgroundImage = "url('chrome-extension://" + chrome.runtime.id + "/images/loop_off_image.png')"; // 初期画像
    button.style.backgroundSize = 'cover'; // 画像をボタンサイズに合わせる
    button.style.backgroundColor = 'transparent'; // 背景色を透明に
    button.style.position = 'relative';
    button.style.top = '-10px'; // ボタンを少し上に移動
    button.style.border = 'none';
    button.style.cursor = 'pointer'; // カーソルをポインターに
    button.style.backgroundRepeat = 'no-repeat';
    button.textContent = ''; // テキストを消去
    button.addEventListener('click', toggleLoop);
    controls.prepend(button);
  }
}

function observeControls() {
  let target = document.querySelector('.ytp-right-controls');
  if (target) {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
          injectButton();
        }
      });
    });

    observer.observe(target, { childList: true, subtree: true });
    injectButton(); // 初回実行
  }
}

observeControls();
