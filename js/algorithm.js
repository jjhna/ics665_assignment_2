let width = 1200;
let height = 1000;
let margin = 100;
let blockMargin = 10;
let blockWidth = 0;

var a = 0;
var b = 0;

var unsortedArray = [];
var sortedArray = [];

var unsortedBlocks = [];
var unsortedText = [];

var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

function createBlocks() {
  d3.select('svg').selectAll('*').remove();

  let size = parseInt(document.getElementById('size').value);

  blockWidth = ((width - (2 * margin)) / (size + 1)) - blockMargin;

  sortedArray = [];
  unsortedArray = [];
  unsortedBlocks = [];
  unsortedText = [];

  unsortedArray = d3.shuffle(d3.range(1, size + 1));

  for(var i = 0; i < size; i++) {
    var tempBlock = svg.append('rect').attr('width', blockWidth).attr('height', blockWidth)
        .attr('x', blockWidth * (i + 1)).attr('y', margin);

    var tempText = svg.append('text').attr('x', blockWidth * (i + 1) + (0.5 * blockWidth)).attr('y', margin + (0.5 * blockWidth))
        .attr('text-anchor', 'middle').attr('dy', '.35em').text(unsortedArray[i]);

    unsortedBlocks.push(tempBlock);
    unsortedText.push(tempText);
  }
}

function swapBlocks(block1, block2, dist) {
  let block1StartPosX = parseFloat(block1.attr('x'));
  let block2StartPosX = parseFloat(block2.attr('x'));

  block1.transition().attr('y', margin - blockWidth).duration(200).on('end', function() {
    d3.select(this).transition().attr('x', (block1StartPosX + dist)).duration(200).on('end', function() {
      d3.select(this).transition().attr('y', margin).duration(200);
    });
  });

  block2.transition().attr('y', margin + blockWidth).duration(200).on('end', function() {
    d3.select(this).transition().attr('x', (block2StartPosX - dist)).duration(200).on('end', function() {
      d3.select(this).transition().attr('y', margin).duration(200);
    });
  });
}

function swapTexts(text1, text2, dist) {
  let text1StartPosX = parseFloat(text1.attr('x'));
  let text2StartPosX = parseFloat(text2.attr('x'));

  text1.transition().attr('y', margin - (0.5 * blockWidth)).duration(200).on('end', function() {
    d3.select(this).transition().attr('x', (text1StartPosX + dist)).duration(200).on('end', function() {
      d3.select(this).transition().attr('y', margin + (0.5 * blockWidth)).duration(200);
    });
  });

  text2.transition().attr('y', margin + (1.5 * blockWidth)).duration(200).on('end', function() {
    d3.select(this).transition().attr('x', (text2StartPosX - dist)).duration(200).on('end', function() {
      d3.select(this).transition().attr('y', margin + (0.5 * blockWidth)).duration(200).on('end', bubbleSortStep());
    });
  });
}

function bubbleSortStep() {
  if (unsortedArray[b] > unsortedArray[b + 1]) {

    var temp = unsortedArray[b + 1];
    unsortedArray[b + 1] = unsortedArray[b];
    unsortedArray[b] = temp;

    swapBlocks(unsortedBlocks[b], unsortedBlocks[b + 1], blockWidth);

    var temp = unsortedBlocks[b + 1];
    unsortedBlocks[b + 1] = unsortedBlocks[b];
    unsortedBlocks[b] = temp;

    swapTexts(unsortedText[b], unsortedText[b + 1], blockWidth);

    var temp = unsortedText[b + 1];
    unsortedText[b + 1] = unsortedText[b];
    unsortedText[b] = temp;
  }

  if (b < parseInt(document.getElementById('size').value) - a - 1) {
    b++;
  } else {
    b = 0;
    a++;
  }
}