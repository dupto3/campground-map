mapboxgl.accessToken = 'pk.eyJ1IjoidXB0b24zMyIsImEiOiJjbGdjZGYxZjUwMW52M2xwY2tqbnQxb3VtIn0.kwrf2PNrfHFdvpflNBj7ow';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [0, 0],
    zoom: 10.4,
    projection: 'globe',
    pitch: 0,
    center: [-73.98, 40.7]
});


map.on('load', function () {

    // Data

    map.addSource('redbud', {
        type: 'geojson',
        data: redbud
    })

    map.addLayer({
        id: 'circle-redbud',
        type: 'circle',
        source: 'redbud',
        paint: {
            'circle-color': '#a8324e',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3, 15, 7], // circle radius increases with zoom
            'circle-opacity': .5
        }
    })

    map.addSource('crabapple', {
        type: 'geojson',
        data: crabapple
    })

    map.addLayer({
        id: 'circle-crabapple',
        type: 'circle',
        source: 'crabapple',
        paint: {
            'circle-color': '#de50c1',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3, 15, 7],
            'circle-opacity': .5

        }
    })

    map.addSource('magnolia', {
        type: 'geojson',
        data: magnolia
    })

    map.addLayer({
        id: 'circle-magnolia',
        type: 'circle',
        source: 'magnolia',
        paint: {
            'circle-color': '#aa42f5',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3, 15, 7],
            'circle-opacity': .5

        }
    })

    // Display additional information in sidebar when a tree is clicked. - magnolia
    map.on('click', 'circle-magnolia', (e) => {
        const feature = e.features[0]
        $('#moreinfo').html(`
            <div>
            <h3>
                Magnolia Tree
            </h3>
            <p>
            <b>Scientific Name:</b> ${feature.properties.spc_latin}<br>
            <b>Bloom Dates:</b> March-May<br>
            <b>Street Address:</b> ${feature.properties.address}<br>
            <b>Neighborhood:</b> ${feature.properties.nta_name}<br>
            <b>Borough:</b> ${feature.properties.boroname}
            </p>
            <img src="images/Magnolia.jpeg" width="240"
            </div>
            `)
    })

    // Display additional information in sidebar when a tree is clicked. - crabapple
    map.on('click', 'circle-crabapple', (e) => {
        const feature = e.features[0]
        $('#moreinfo').html(`
            <div>
            <h3>
                Crabapple Tree
            </h3>
            <p>
            <b>Scientific Name:</b> ${feature.properties.spc_latin}<br>
            <b>Bloom Dates:</b> April-May<br>
            <b>Street Address:</b> ${feature.properties.address}<br>
            <b>Neighborhood:</b> ${feature.properties.nta_name}<br>
            <b>Borough:</b> ${feature.properties.boroname}
            </p>
            <img src="images/Crabapple.jpeg" width="240">
            </div>
            `)
    })

    // Display additional information in sidebar when a tree is clicked. - redbud
    map.on('click', 'circle-redbud', (e) => {
        const feature = e.features[0]
        $('#moreinfo').html(`
            <div>
            <h3>
                Eastern Redbud Tree
            </h3>
            <p>
            <b>Scientific Name:</b> ${feature.properties.spc_latin}<br>
            <b>Bloom Dates:</b> April-June<br>
            <b>Street Address:</b> ${feature.properties.address}<br>
            <b>Neighborhood:</b> ${feature.properties.nta_name}<br>
            <b>Borough:</b> ${feature.properties.boroname}
            </p>
            <img src="images/Redbud.jpeg" width="240"
            </div>
            `)
    })

    // Change the cursor to a pointer when the mouse is over circle-magnolia.
    map.on('mouseenter', 'circle-magnolia', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'circle-magnolia', () => {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over circle-crabapple.
    map.on('mouseenter', 'circle-crabapple', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'circle-crabapple', () => {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over circle-redbud.
    map.on('mouseenter', 'circle-redbud', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'circle-redbud', () => {
        map.getCanvas().style.cursor = '';
    });


})

// Add navigation controls

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

// Create menu filter
// Source: https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/

map.on('idle', () => {

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['circle-redbud', 'circle-crabapple', 'circle-magnolia'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {//create filter


            continue;
        }

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };

        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});