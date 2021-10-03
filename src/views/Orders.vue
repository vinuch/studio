<template>
  <div>
		<v-container v-if="!orders">
			<p>You have no orders yet</p>
		</v-container>
		<v-container v-else>
			<v-row>
				<v-col>
					<v-sheet
						elevation="0"
						rounded="lg"
						color="bg_grey"
						class="ma-5 mb-0 pa-5"
					>
						jhjh
					</v-sheet>
				</v-col>
			</v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => {
			return {
				orders: true,
      }
    },
    components: {
    },
  }
</script>
