document.getElementById('generate-graph').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const nodes = [];
    const links = [];

    // Simple text processing to create nodes and links
    const sentences = textInput.split('.').filter(sentence => sentence.trim().length > 0);
    sentences.forEach((sentence, index) => {
        const words = sentence.split(' ').filter(word => word.trim().length > 0);
        words.forEach(word => {
            if (!nodes.find(node => node.id === word)) {
                nodes.push({ id: word });
            }
        });
        for (let i = 0; i < words.length - 1; i++) {
            links.push({ source: words[i], target: words[i + 1] });
        }
    });

    // Clear previous graph
    d3.select('svg').selectAll('*').remove();

    const svg = d3.select('svg');
    const width = svg.attr('width');
    const height = svg.attr('height');

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#999')
        .attr('stroke-width', '1.5px');

    const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 10)
        .attr('fill', '#007bff')
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));

    const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('dy', -15)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000')
        .text(d => d.id);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        label
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });

    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
